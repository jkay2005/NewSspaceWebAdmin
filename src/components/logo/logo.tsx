import type { LinkProps } from '@mui/material/Link';

// import { useId } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

const LogoSvg = (
  <img
    src="/assets/logo/ic_logo_newspace.svg"
    alt="logo"
    style={{ width: 'auto', height: 40 }}
  />
);

export type LogoProps = LinkProps & {
  isSingle?: boolean;
  disabled?: boolean;
};

export function Logo({
  sx,
  disabled,
  className,
  href = '/',
  isSingle = true,
  ...other
}: LogoProps) {
  // const theme = useTheme();

  // const gradientId = useId();

  // const TEXT_PRIMARY = theme.vars.palette.text.primary;
  // const PRIMARY_LIGHT = theme.vars.palette.primary.light;
  // const PRIMARY_MAIN = theme.vars.palette.primary.main;
  // const PRIMARY_DARKER = theme.vars.palette.primary.dark;

  const singleLogo = LogoSvg;

  const fullLogo = LogoSvg;

  return (
    <LogoRoot
      component={RouterLink}
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          height: 40,
          ...(!isSingle && { height: 40 }),
          ...(disabled && { pointerEvents: 'none' }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  display: 'inline-flex',
  verticalAlign: 'middle',
}));
