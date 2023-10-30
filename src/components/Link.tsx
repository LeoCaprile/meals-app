import { PropsWithChildren } from "@kitajs/html";
import { Pages } from "../htmx";

type LinkProps = {
	href: Pages;
};

const Link = ({
	href,
	children,
	...rest
}: PropsWithChildren<LinkProps & Omit<HTMLElement, "href">>) => {
	return (
		<a href={href} {...rest}>
			{children}
		</a>
	);
};

export default Link;
