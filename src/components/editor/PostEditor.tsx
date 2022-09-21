import { MutableRefObject, memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface IProps {
  editorRef: MutableRefObject<null>;
  initialValue: string;
  height?: number | string | undefined;
  menubar: boolean;
}

const PostEditor = ({
  editorRef,
  initialValue,
  height,
  menubar,
}: IProps) => {
  return (
    <Editor
      // @ts-ignore
      onInit={(_, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      init={{
        height,
        menubar,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};

export default memo(PostEditor);
