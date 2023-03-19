interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    background?: string;
    hoverColor?: string;
    textColor?: string;
    [key: string]: any;
}


export default function Button({ type = 'button', className = '', disabled = false, children,  background = 'bg-white', hoverColor='bg-gray-50', textColor = 'text-gray-700', ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className + ' ' + background + ' ' + textColor + ' hover:'+hoverColor
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
