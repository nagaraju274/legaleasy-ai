'use server';

import mammoth from 'mammoth';

export async function parseDocument(
  formData: FormData
): Promise<{ text: string; error?: string }> {
  const file = formData.get('file') as File;

  if (!file) {
    return { text: '', error: 'No file provided.' };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (file.type === 'application/pdf') {
       return {
        text: '',
        error: `PDF parsing is temporarily disabled. Please upload a DOCX or plain text file.`,
      };
    } else if (
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return { text: result.value };
    } else if (file.type.startsWith('text/')) {
      return { text: buffer.toString('utf-8') };
    } else {
      return {
        text: '',
        error: `Unsupported file type: ${file.type}. Please upload a DOCX or plain text file.`,
      };
    }
  } catch (error) {
    console.error(`Error parsing file ${file.name}:`, error);
    return {
      text: '',
      error: 'The file appears to be corrupted or is in an unsupported format.',
    };
  }
}
