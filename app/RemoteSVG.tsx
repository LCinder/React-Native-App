import React from "react";
import {useEffect, useState} from "react";
import {SvgXml} from "react-native-svg";

export const RemoteSVG = ({ uri, width = 100, height = 100, color = "#FFF" }) => {
    const [svgContent, setSvgContent] = useState<string>("");

    useEffect(() => {
        fetch(uri)
            .then(res => res.text())
            .then(text => setSvgContent(text.replace(/fill="[^"]*"/gi, `fill="${color}"`)))
    }, [uri, color, svgContent]);

    if (!svgContent) return <></>;

    return <SvgXml xml={svgContent} width={width} height={height} />;
};
