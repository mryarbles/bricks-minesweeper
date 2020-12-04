import React from 'react';
import { observer } from 'mobx-react';

interface IProps {
  className?: string;
  children: any;
  classNameProp?: string;
}

const RenderClassName = observer(
  ({ className, classNameProp, children }: IProps): JSX.Element => {
    const props: any = {};

    if (classNameProp) {
      props[classNameProp] = className;
    } else {
      props.className = className;
    }

    return React.cloneElement(children, props);
  }
);

export default RenderClassName;
