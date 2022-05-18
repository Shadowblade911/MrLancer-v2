import { inlineCode } from "@discordjs/builders";
import { PROMPT } from "../dbConstants/dbConstants";

export const renderPrompt = (suggestion: PROMPT) => {
    const { id, prompt } = suggestion;
    return `#${inlineCode(id.toString())}\n > ${prompt.replace(/\n/g, '\n> ')}`;
}