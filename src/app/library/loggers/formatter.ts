
/**
 * Format log message. (Date) - ClassName. Message
 * @param  {string} typeName class name
 * @param  {string} message  message
 * @return {string} return (Date) - ClassName. Messages
 */
export function eicformatlog(typeName: string, message: any, object = false): string {
    return "(" + new Date().toLocaleString() + ") - " +
     typeName + ". " +
     ( object ? JSON.stringify(message) : message );
}
