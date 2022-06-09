import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Button, css, styled, Typography } from "@mui/material";
import { CustomChildren } from "./CustomChildren";

const Container = styled(Box)(({ theme }) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 300px;
    height: 200px;
    border: 2px #c3c3c3 dashed;
    border-radius: 12px;
  `;
});

type FileDnDProps = {
  onUpload: (files: any) => void;
};

type FileTypes = {
  id: number;
  object: File;
};

export const FileDnD = (props: FileDnDProps) => {
  /** Property */
  const { onUpload, ...others } = props;

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<FileTypes[]>([]);

  /** Function */
  const stopDefault = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: FileTypes) => file.id !== id));
    },
    [files]
  );

  const handleDragEnter = useCallback((e: DragEvent) => {
    stopDefault(e);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    stopDefault(e);

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    stopDefault(e);

    if (e.dataTransfer?.files) {
      setIsDragging(true);
    }
  }, []);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      let selectFiles: File[] = [];
      // tempFiles를 통해서 선택했던 파일 담기
      let tempFiles: FileTypes[] = files;

      // 드래그 했을 때, 안했ㅇ르 때 파일 배열 다르게
      if (e.type === "drop") {
        // 파일 Drag&Drop 했을 때
        selectFiles = e.dataTransfer.files;
      } else {
        // upload 버튼 눌렀을 때
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
          },
        ];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      stopDefault(e);

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvent = useCallback(() => {
    // 마운트 될 때, Listener 등록
    if (dragRef.current !== null) {
      dragRef.current?.addEventListener("dragover", handleDragOver);
      dragRef.current?.addEventListener("drop", handleDrop);
      dragRef.current.addEventListener("dragenter", handleDragEnter);
      dragRef.current.addEventListener("dragleave", handleDragLeave);
    }
  }, [handleDragOver, handleDrop, handleDragEnter, handleDragLeave]);

  const resetDragEvents = useCallback((): void => {
    // 언마운트 될 때, Listener 삭제
    if (dragRef.current !== null) {
      dragRef.current?.addEventListener("dragover", handleDragOver);
      dragRef.current?.addEventListener("drop", handleDrop);
      dragRef.current.addEventListener("dragenter", handleDragEnter);
      dragRef.current.addEventListener("dragleave", handleDragLeave);
    }
  }, [handleDragOver, handleDrop, handleDragEnter, handleDragLeave]);

  useEffect(() => {
    initDragEvent();

    return () => resetDragEvents();
  }, [initDragEvent, resetDragEvents]);

  /** Render */
  return (
    <Box>
      <input
        type="file"
        accept={"*"}
        id={"fileUpload"}
        style={{ display: "none" }}
      />
      <label htmlFor="fileUpload" ref={dragRef}>
        <Container ref={dragRef}>
          Drop file here!
          <span role="img">&#128526;</span>
        </Container>
      </label>

      <Box>
        {files.length > 0 &&
          files.map((file: FileTypes) => {
            const {
              id,
              object: { name },
            } = file;
            return (
              <Box key={id}>
                <Typography>{name}</Typography>
                <Button onClick={() => handleFilterFile(id)}>X</Button>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
