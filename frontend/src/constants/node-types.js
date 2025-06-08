import {
  LogIn,
  LogOut,
  BrainCircuit,
  Text,
  Languages,
  FolderKanban,
  AlignJustify,
  Regex,
  FolderInput,
  Smile
} from 'lucide-react';

export const NODE_TYPES = {
  customInput: {
    type: 'customInput',
    title: 'Input',
    icon: <FolderInput className="w-5 h-5" />,
  },
  llm: {
    type: 'llm',
    title: 'LLM',
    icon: <BrainCircuit className="w-5 h-5" />,
  },
  customOutput: {
    type: 'customOutput',
    title: 'Output',
    icon: <LogOut className="w-5 h-5" />,
  },
  text: {
    type: 'text',
    title: 'Text',
    icon: <Text className="w-5 h-5" />,
  },
  translator: {
    type: 'translator',
    title: 'Translator',
    icon: <Languages className="w-5 h-5" />,
  },
  classifier: {
    type: 'classifier',
    title: 'Classifier',
    icon: <FolderKanban className="w-5 h-5" />,
  },
  summarizer: {
    type: 'summarizer',
    title: 'Summarizer',
    icon: <AlignJustify className="w-5 h-5" />,
  },
  regex: {
    type: 'regex',
    title: 'Regex',
    icon: <Regex className="w-5 h-5" />,
  },
  sentiment: {
    type: 'sentiment',
    title: 'Sentiment',
    icon: <Smile className="w-5 h-5" />,
  },
}; 