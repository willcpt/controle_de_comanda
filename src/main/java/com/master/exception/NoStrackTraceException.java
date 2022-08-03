package com.master.exception;

public class NoStrackTraceException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public NoStrackTraceException(final String message) {
        super(message, null, true, false);
    }

    public NoStrackTraceException(final String message, final Throwable cause) {
        super(message, cause, true, false);
    }
    
}