import React from 'react'

interface WithThemeTemplate {
    bg_image: string
}

const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
    class WithTheme extends React.Component<P & WithThemeTemplate>{
        render(){
            const { bg_image, ...props} = this.props;
            return <Component {...props as P}></Component>
        }
    };
    return WithTheme;
}

export default withTheme