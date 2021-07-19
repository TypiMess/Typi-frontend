import React, { ReactElement } from "react";
import { Modal as BModal } from 'bootstrap'
import ChatApp from "../ChatApp";

interface IProps {
    title: string,
    showCloseButton: boolean,
    closeButtonText: string,
    additionalFooter?: ReactElement
}

export default class Modal extends React.Component<IProps> {
    static defaultProps = {
        showCloseButton: true,
        closeButtonText: "Close"
    }
    
    private modalRef: React.RefObject<HTMLDivElement>;
    
    constructor(props: IProps)
    {
        super(props);
        
        this.modalRef = React.createRef();
    }
    
    componentDidMount() {
        if (this.modalRef.current)
        {
            const modal = new BModal(this.modalRef.current as Element);
            modal.show();
            
            this.modalRef.current.addEventListener('hidden.bs.modal', (event) => {
                ChatApp.RemoveModal();
            });
        }
        else
        {
            throw new Error("Reference to modal DOM not found!");
        }
    }
    
    render() {
        return (
            <div ref={this.modalRef} className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{ this.props.title }</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { this.props.children }
                        </div>
                        <div className="modal-footer">
                            {
                                this.props.additionalFooter
                            }
                            {
                                this.props.showCloseButton && <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{ this.props.closeButtonText }</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}