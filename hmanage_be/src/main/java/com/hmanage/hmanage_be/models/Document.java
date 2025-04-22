package com.hmanage.hmanage_be.models;

import java.security.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Document")
public class Document {
    @Id
    @GeneratedValue(strategy    = GenerationType.IDENTITY)
    private     Integer         documentId          ;
    
    private     Integer         projectId           ;
    private     String          fileName            ;
    private     String          fileType            ;
    private     String          filePath            ;
    private     Timestamp       uploadedAt          ;

    public Integer getDocumentId()                  {
        return documentId;
    }

    public void setDocumentId(Integer documentId)   {
        this.documentId = documentId;
    }

    public Integer getProjectId()                   {
        return projectId;
    }

    public void setProjectId(Integer projectId)     {
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
