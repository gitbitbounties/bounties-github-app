import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

function Row(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

export default function VirtualizedList() {
    return (
        <div className="list">
            <FixedSizeList height={400} width={360} itemSize={46} itemCount={200}>
                {Row}
            </FixedSizeList>
        </div>
    );
}
