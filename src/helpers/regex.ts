export const RegexWordScript = /\b(?!script\b)\w+\b/i
export const RegexSubdomain = /^[ a-z0-9-]+$/
export const RegexPath = /^[ a-zA-Z0-9-_]+$/
export const RegexSanitize = /^[ a-zA-Z0-9_,.()'"&-/]+$/
export const RegexObjectID = /^[0-9a-fA-F]{24}$/
export const RegexContentOtherFile = /text\/html|application\/json/
