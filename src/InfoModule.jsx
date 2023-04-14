import React from 'react'

export default function InfoModule({ text }) {
  return (
    <div className={`module ${text.class}`}>
      <h5 className="module_category">{text.category}</h5>
      <h3 className="module_title">
        {text.title} {text.titleExtra && <span>{text.titleExtra}</span>}
      </h3>
      {text.ends && <p className="module_time">до {text.ends}</p>}
      <p className="module_description">{text.description}</p>
    </div>
  )
}
