class HttpError extends Error {
    status: number;
    details?: object;

    constructor(message: string, status: number, details?: object) {
        super(message);
        this.status = status;
        this.details = details;
    };
}

export { HttpError }