
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, FilePlus, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const allowedFileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/pdf"
  ];

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUploadFile(e.target.files[0]);
    }
  };

  const validateAndUploadFile = (file: File) => {
    if (!allowedFileTypes.includes(file.type)) {
      toast.error("Please upload a CSV, Excel, or PDF file.", {
        description: "Only these file formats are supported."
      });
      return;
    }
    
    // Simulating file size check
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File is too large", {
        description: "Maximum file size is 5MB."
      });
      return;
    }
    
    onFileUpload(file);
    toast.success("File uploaded successfully", {
      description: `Analyzing "${file.name}"...`
    });
  };

  const getFileIcon = () => {
    return (
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-medical-50 mb-4">
        <FilePlus className="h-8 w-8 text-medical-500" />
      </div>
    );
  };

  return (
    <div
      className={`file-upload-container border-2 border-dashed rounded-lg p-10 text-center transition-all ${
        dragging ? "dragging" : "border-gray-300 hover:border-medical-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {getFileIcon()}
      <h3 className="text-lg font-medium mb-1">Upload Blood Test Report</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Drag and drop your file here, or click to browse
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <div className="flex items-center px-3 py-1 bg-medical-50 rounded-full text-xs">
          <FileSpreadsheet className="h-3 w-3 mr-1" />
          CSV
        </div>
        <div className="flex items-center px-3 py-1 bg-medical-50 rounded-full text-xs">
          <FileSpreadsheet className="h-3 w-3 mr-1" />
          Excel
        </div>
        <div className="flex items-center px-3 py-1 bg-medical-50 rounded-full text-xs">
          <FileText className="h-3 w-3 mr-1" />
          PDF
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="bg-white hover:bg-gray-50"
      >
        <Upload className="h-4 w-4 mr-2 upload-icon" />
        Choose File
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".csv,.xlsx,.xls,.pdf"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default FileUpload;
