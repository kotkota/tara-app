import { ReactComponent as InfoOutlined } from "../assets/icons/info.svg";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";

export default function InfoModule({ text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`module ${text.class}`}>
      {text.category && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h5 className="module_category">{text.category}</h5>
          <IconButton
            aria-label={`Что такое ${text.category}?`}
            variant="plain"
            color="transparent"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            <InfoOutlined fill="darkseagreen" />
          </IconButton>
        </Box>
      )}
      <h3 className="module_title">
        {text.title} {text.titleExtra && <span>{text.titleExtra}</span>}
      </h3>
      {text.subTitle && <p className="module_subtitle">{text.subTitle}</p>}
      <p className="module_description">{text.description}</p>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalDialog
          aria-labelledby="modal-dialog-title"
          aria-describedby="modal-dialog-description"
          size="sm"
          variant="plain"
          sx={(theme) => ({
            boxShadow: theme.shadow.xs,
            maxWidth: 430,
            width: "calc(100vw - 40px)",
            overflow: "scroll",
          })}
        >
          <ModalClose />
          <Typography id="modal-dialog-title" level="h3">
            {text.category}
          </Typography>
          <div
            id="modal-dialog-description"
            level="body"
            dangerouslySetInnerHTML={{ __html: text.categoryDescription }}
          />
        </ModalDialog>
      </Modal>
    </div>
  );
}
