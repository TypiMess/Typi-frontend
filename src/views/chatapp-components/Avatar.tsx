import React from "react";

interface IProps {
    text?: string,
    img?: string
}

export default class Avatar extends React.Component<IProps> {
    private style = {
        borderRadius: "50% 50%",
        background: this.props.img ? `no-repeat center/100% url(${this.props.img})` : 'grey',
        width: "2.5em",
        height: "2.5em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textTransform: "uppercase",
        overflow: "hidden"
    } as React.CSSProperties
    
    constructor(props: IProps)
    {
        super(props);
    }
    
    render() {
        return (
            <div style={ this.style }>{ this.props.text }</div>
        )
    }
}