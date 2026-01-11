export function sanitizeInput(input: any) {
    if (typeof input === "string") {
      return input.replace(/[<>$]/g, "");
    }
  
    if (typeof input === "object") {
      for (const key in input) {
        input[key] = sanitizeInput(input[key]);
      }
    }
  
    return input;
  }
  