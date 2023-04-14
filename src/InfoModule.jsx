import "./styles.css";
import "@flodesk/grain/es/styles/base.css";
import React from "react";
import { Arrange, Modal, IconButton, IconInfo } from "@flodesk/grain";
import { useState } from "react";

export default function InfoModule({ text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`module ${text.class}`}>
      {text.category && (
        <Arrange justifyContent="space-between">
          <h5 className="module_category">{text.category}</h5>
          <IconButton
            icon={<IconInfo size="s" color="darkseagreen" />}
            onClick={() => setIsOpen(true)}
          />
        </Arrange>
      )}
      <h3 className="module_title">
        {text.title} {text.titleExtra && <span>{text.titleExtra}</span>}
      </h3>
      {text.ends && <p className="module_time">до {text.ends}</p>}
      <p className="module_description">{text.description}</p>
      <Modal
        cardPadding="l"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={text.category}
        description={text.categoryDescription}
      ></Modal>
    </div>
  );
}
