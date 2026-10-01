import { execSync } from 'node:child_process';
import { effects, type Effect } from '../data/effects';
import { effectsIn, type Category } from '../data/seo';
import { blockLines } from './effectCss';

/**
 * Build-time freshness dates for the sitemap and structured data.
 *
 * An effect page changes when its CSS block in global.css changes, or when the
 * effect page template does — so `git blame` on the block gives an honest
 * last-modified date, and the earliest line gives a published date. Without
 * git history (e.g. a shallow deploy checkout) everything falls back to the
 * build date.
 */

const BUILD = new Date();

function git(cmd: string): string {
  try {
    return execSync(`git ${cmd}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20 });
  } catch {
    return '';
  }
}

// Commit time of every line in global.css (index 0 = line 1). Uncommitted
// lines report the current time, which is correct for a fresh build.
const lineTimes: number[] = [];
{
  let pending = 0;
  for (const line of git('blame --line-porcelain -- src/styles/global.css').split('\n')) {
    if (line.startsWith('committer-time ')) pending = Number(line.slice(15)) * 1000;
    else if (line.startsWith('\t')) lineTimes.push(pending);
  }
}

const fileTime = (path: string) => {
  const t = Number(git(`log -1 --format=%ct -- ${path}`).trim());
  return t ? t * 1000 : 0;
};
const templateTime = fileTime('src/pages/effects/[slug].astro');

interface Dates {
  published: Date;
  modified: Date;
}

const dates = new Map<Effect, Dates>();
for (const effect of effects) {
  const range = blockLines.get(effect.index);
  const times = range && lineTimes.length ? lineTimes.slice(range[0] - 1, range[1]).filter(Boolean) : [];
  if (!times.length) {
    dates.set(effect, { published: BUILD, modified: BUILD });
    continue;
  }
  dates.set(effect, {
    published: new Date(Math.min(...times)),
    modified: new Date(Math.max(...times, templateTime)),
  });
}

export const effectDates = (effect: Effect): Dates => dates.get(effect)!;

const latest = (list: Effect[]) => new Date(Math.max(...list.map((e) => dates.get(e)!.modified.getTime())));

export const categoryModified = (category: Category) => latest(effectsIn(category));
export const siteModified = () => latest(effects);

/** W3C date (YYYY-MM-DD) for <lastmod> */
export const ymd = (d: Date) => d.toISOString().slice(0, 10);

