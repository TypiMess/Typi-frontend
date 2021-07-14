import React from "react";

interface IProps {
    text?: string,
    img?: string
}

export default class Avatar extends React.Component<IProps> {
    private style = {
        borderRadius: "50% 50%",
        background: this.props.img ? `no-repeat center/100% url(${this.props.img})` : 'grey',
        width: "1.5em",
        height: "1.5em"
    }
    
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