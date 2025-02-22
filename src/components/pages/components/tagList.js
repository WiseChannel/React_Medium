import React from "react";

const TagList = ({tags}) => {
    return (
        <ul className='tag-list'>
            {tags.map(tag => (
                <li key={tag} className='tag-defult tag-pill tag-outline'>
                    {tag}
                </li>
            ))}
        </ul>
    )
};

export default TagList
