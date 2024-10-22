import React from "react"

export interface ModalLayoutProps {
    title: string
    content: React.ReactNode
}

const ModalLayout = ({ title, content }: ModalLayoutProps) => {
    return <div className="container">
        <div className="modal">
            <div className="headerSection"><h3>{title}</h3></div>
            <div className="contentSection">{content}</div>
        </div>
    </div>
}

export default ModalLayout