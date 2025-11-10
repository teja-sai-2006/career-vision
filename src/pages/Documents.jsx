import React, { useState } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Upload } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentCard from "../components/documents/DocumentCard";
import DocumentForm from "../components/documents/DocumentForm";

export default function Documents() {
  const [showForm, setShowForm] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [filter, setFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: documents = [] } = useQuery({
    queryKey: ['documents'],
    queryFn: () => careerVision.entities.CareerDocument.filter({ created_by: user?.email }, '-created_date'),
    enabled: !!user,
  });

  const createDocMutation = useMutation({
  mutationFn: (data) => careerVision.entities.CareerDocument.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setShowForm(false);
      setEditingDoc(null);
    },
  });

  const updateDocMutation = useMutation({
  mutationFn: ({ id, data }) => careerVision.entities.CareerDocument.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setShowForm(false);
      setEditingDoc(null);
    },
  });

  const deleteDocMutation = useMutation({
  mutationFn: (id) => careerVision.entities.CareerDocument.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const handleSubmit = async (data) => {
    if (editingDoc) {
      updateDocMutation.mutate({ id: editingDoc.id, data });
    } else {
      createDocMutation.mutate(data);
    }
  };

  const filteredDocuments = filter === "all" 
    ? documents 
    : documents.filter(doc => doc.document_type === filter);

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Career Documents
            </h1>
            <p className="text-slate-600 mt-1">Manage your resumes, cover letters, and more</p>
          </div>
          <Button
            onClick={() => {
              setEditingDoc(null);
              setShowForm(!showForm);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Document
          </Button>
        </div>

        {/* Document Form */}
        {showForm && (
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">
                {editingDoc ? 'Edit Document' : 'Add New Document'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentForm
                document={editingDoc}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingDoc(null);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-4">
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="bg-slate-100">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="resume">Resumes</TabsTrigger>
                <TabsTrigger value="cover_letter">Cover Letters</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="certificate">Certificates</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Documents List */}
        {filteredDocuments.length === 0 ? (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {filter === "all" ? "No documents yet" : `No ${filter.replace('_', ' ')}s found`}
                </h3>
                <p className="text-slate-600 mb-6">
                  Start organizing your career documents!
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Your First Document
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onEdit={(doc) => {
                  setEditingDoc(doc);
                  setShowForm(true);
                }}
                onDelete={(id) => {
                  if (window.confirm('Are you sure?')) {
                    deleteDocMutation.mutate(id);
                  }
                }}
                onSetCurrent={(id) => {
                  // First, set all docs of same type to not current
                  const doc = documents.find(d => d.id === id);
                  documents
                    .filter(d => d.document_type === doc.document_type && d.id !== id)
                    .forEach(d => {
                      updateDocMutation.mutate({ id: d.id, data: { ...d, is_current: false } });
                    });
                  // Then set this one to current
                  updateDocMutation.mutate({ id, data: { ...doc, is_current: true } });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}