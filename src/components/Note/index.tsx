import { Component } from 'react';
import './note.css'

interface Props {
    note: string
}

class Note extends Component<Props, {}> {
    render() {
        return (
            <p className="note">{this.props.note}</p>
        );
    }
}

export default Note;
