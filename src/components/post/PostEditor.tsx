import { MutableRefObject, memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorComponent from '../ErrorComponent';

interface IProps {
  editorRef: MutableRefObject<null>;
  initialValue: string;
  height?: number | string | undefined;
  menubar: boolean;
}

const PostEditor = ({ editorRef, initialValue, height, menubar }: IProps) => {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINY_MCE}
      // @ts-ignore
      onInit={(_, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      init={{
        height,
        menubar,
        plugins: [
          'advlist',
          'autolink',
          'link',
          'image',
          'lists',
          'charmap',
          'preview',
          'anchor',
          'pagebreak',
          'searchreplace',
          'wordcount',
          'visualblocks',
          'visualchars',
          'code',
          'insertdatetime',
          'media',
          'table',
          'emoticons',
        ],
        toolbar:
          'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image preview emoticons',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};

export default memo(
  withErrorBoundary(PostEditor, {
    FallbackComponent: ErrorComponent,
  }),
);
