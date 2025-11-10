import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Download, Star, FileText } from "lucide-react";
import { format } from "date-fns";

const typeColors = {
  resume: "bg-blue-100 text-blue-700 border-blue-200",
  cover_letter: "bg-purple-100 text-purple-700 border-purple-200",
  portfolio: "bg-green-100 text-green-700 border-green-200",
  certificate: "bg-orange-100 text-orange-700 border-orange-200",
  reference: "bg-pink-100 text-pink-700 border-pink-200",
  other: "bg-slate-100 text-slate-700 border-slate-200"
};

export default function DocumentCard({ document, onEdit, onDelete, onSetCurrent }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-lg text-slate-900 truncate">{document.title}</h3>
            </div>
            <Badge className={`${typeColors[document.document_type]} border text-xs`}>
              {document.document_type?.replace('_', ' ')}
            </Badge>
          </div>
          {document.is_current && (
            <Button
              variant="ghost"
              size="icon"
              className="text-yellow-500 hover:text-yellow-600"
            >
              <Star className="w-5 h-5 fill-current" />
            </Button>
          )}
        </div>

        {document.version && (
          <div className="text-xs text-slate-500 mb-2">
            Version: {document.version}
          </div>
        )}

        {document.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{document.description}</p>
        )}

        {document.tags && document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {document.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="bg-slate-50 text-slate-600 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {document.last_updated && (
          <div className="text-xs text-slate-500 mb-4">
            Updated: {format(new Date(document.last_updated), 'MMM d, yyyy')}
          </div>
        )}

        <div className="flex gap-2">
          {document.file_url && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(document.file_url, '_blank')}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
          {!document.is_current && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSetCurrent(document.id)}
              className="text-slate-400 hover:text-yellow-600"
            >
              <Star className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(document)}
            className="text-slate-400 hover:text-purple-600"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(document.id)}
            className="text-slate-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}