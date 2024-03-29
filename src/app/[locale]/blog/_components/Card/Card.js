import Image from 'next/image';
import ConditionalRenderer from '../../_utils/conditional-renderer';
import BlogButton from '@/app/[locale]/blog/_components/Button/Button';
import Link from 'next/link';

export const BlogCard = (props) => (
  /* Blog card */
  <div
    className="
      hover:scale-[1.02] duration-200
      blog_shadow h-[calc(100%-30px)] flex flex-col mb-8 gap-[30px] overflow-hidden rounded-xl 
      bg-gradient-to-t from-slate-800 to-slate-900
      @2xl:h-auto @2xl:flex-row"
  >
    {/* Blog card image container */}
    <Link
      href={props.href}
      className="
        relative w-full aspect-video
        @2xl:flex-1"
    >
      <Image
        className="object-cover min-h-full"
        src={props.imageSrc}
        alt={props.imageAlt}
        fill={true}
      />
    </Link>

    {/* Blog card text container */}
    <div
      className="
        flex flex-1 flex-col justify-items-start p-5 pt-0
        @2xl:justify-center @2xl:pl-0"
    >
      {/* Small category label section, pre-defined colors from CMS enum list */}
      <ConditionalRenderer condition={props.label}>
        <div
          className={`
            rounded-full py-1.5 px-3 bg-teal-900/20 w-fit
            mb-2.5 blog_text_c_orange font-semibold
            blog_text_c_${props.color}`}
        >
          {props.label}
        </div>
      </ConditionalRenderer>

      {/* Title */}
      <ConditionalRenderer condition={props.title}>
        <div className="text-3xl mb-5 font-bold">{props.title}</div>
      </ConditionalRenderer>

      {/* Summary */}
      <ConditionalRenderer condition={props.summary}>
        <p className="font-semibold text-base mb-5">{props.summary}</p>
      </ConditionalRenderer>

      {/* Read More button */}
      <ConditionalRenderer condition={props.href}>
        <span
          className="
            h-full flex items-end w-[160px] pb-1 @2xl:pb-0
            @2xl:h-auto"
        >
          <BlogButton href={props.href} icon={props.btnIcon}>
            {props.btnLabel || 'Read More'}
          </BlogButton>
        </span>
      </ConditionalRenderer>
    </div>
  </div>
);
