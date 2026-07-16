import React from 'react';

interface Props {
    description?: string;
}

const Divider = ({ description }: Props) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                {description && <span className="px-2 bg-white text-gray-500">{description}</span>}
            </div>
        </div>
    )
}

export default Divider;