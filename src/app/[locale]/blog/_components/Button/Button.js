import { lato } from '@/app/_utils/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Link } from '@/app/_lib/i18nNavigation';

export const IconTypes = {
  ARROW_RIGHT: 'ARROW_RIGHT',
};

const BlogButton = (props) => {
  if (props.href) {
    return (
      <Link className={`button_primary_rounded_full`} href={props.href}>
        {props.children}
        <BlogButton.Icon iconType={props.icon} />
      </Link>
    );
  }

  return (
    <button className={`button_primary_rounded_full`}>{props.children}</button>
  );
};

// eslint-disable-next-line react/display-name
BlogButton.Icon = ({ iconType }) => {
  if (iconType === 'ARROW_RIGHT') {
    return <ArrowRightIcon aria-hidden="true" className="ml-4 h-5 w-5" />;
  }
};

export default BlogButton;
