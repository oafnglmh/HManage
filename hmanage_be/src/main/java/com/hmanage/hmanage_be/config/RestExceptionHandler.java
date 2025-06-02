package com.hmanage.hmanage_be.config;

import com.hmanage.hmanage_be.Exceptions.AppException;
import com.hmanage.hmanage_be.dto.ErrorDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDto> handleAppException(AppException e) {
        return ResponseEntity.status(e.getCode())
                .body(ErrorDto.builder().message(e.getMessage()).build());
    }
}
