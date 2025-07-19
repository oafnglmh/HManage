package com.hmanage.hmanage_be.models;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Document")
public class Document {
    @Id
    private     Long          documentId          ;
    
    private     Long          projectId           ;
    private     String          fileName            ;
    private     String          fileType            ;
    private     String          filePath            ;
    private     Timestamp       uploadedAt          ;

    public Long  getDocumentId()                  {
        return documentId;
    }

    public void setDocumentId(Long  documentId)   {
        this.documentId = documentId;
    }

    public Long  getProjectId()                   {
        return projectId;
    }

    public void setProjectId(Long  projectId)     {
        this.projectId = projectId;
    }

    public String getFileName()                     {
        return fileName;
    }

    public void setFileName(String fileName)        {
        this.fileName = fileName;
    }

    public String getFileType()                     {
        return fileType;
    }

    public void setFileType(String fileType)        {
        this.fileType = fileType;
    }

    public String getFilePath()                     {
        return filePath;
    }

    public void setFilePath(String filePath)        {
        this.filePath = filePath;
    }

    public Timestamp getUploadedAt()                {
        return uploadedAt;
    }

    public void setUploadedAt(Timestamp uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}
