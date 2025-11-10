import { readFile } from 'fs/promises';
import { join } from 'path'
import mjml2html from 'mjml';

const replacePlaceholders = (source: string, data: Record<string, any>): string => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return acc.replace(placeholder, value);
  }, source);
}

const renderMjmlEmail = async (templateName: string, data: Record<string, any>): Promise<string> => {
  const mjmlTemplatePath = join(__dirname, '../../assets/mail/', templateName)
  const mjmlSource = await readFile(mjmlTemplatePath, 'utf-8')

  let content = replacePlaceholders(mjmlSource, data);
  
  const { html } = mjml2html(content)
  
  return html
}

export default renderMjmlEmail