import React, { useState } from "react"
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableDemo: React.FC = () => {
    const [height, setHeight] = useState(200);
    const [width, setWidth] = useState(200);
    const onResize = (event, {node, size, handle}) => {
        setHeight(size.height);
        setWidth(size.width)
    };
    return (<>
        <Resizable height={height} width={width} onResize={onResize}>
            <div className="box" style={{width: width + 'px', height: height + 'px'}}>
                <span>Contents</span>
            </div>
        </Resizable>
    </>)
}

export default ResizableDemo;