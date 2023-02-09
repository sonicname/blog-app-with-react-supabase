import { memo } from 'react';
import classNames from 'classnames';

interface IProps {
  toggle?: boolean;
  setToggle: (value: boolean) => void;
  className?: string;
}

const Overlay = ({ toggle, setToggle = () => {}, className }: IProps) => {
  return (
    <div
      className={classNames(
        'fixed inset-0 bg-black bg-opacity-70 opacity-0 invisible duration-200 lg:hidden',
        toggle && '!opacity-70 !visible',
        className,
      )}
      onClick={() => setToggle(false)}
    />
  );
};

export default memo(Overlay);
