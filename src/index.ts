import * as $ from 'jquery';

import { parseRevEl } from './parser';
import { compare } from './compare';

async function main(): Promise<void> {
  console.log('start bgm-wiki-rev-diff UserScript');
  await initUI();
}

async function initUI(): Promise<void> {
  $('#columnInSubjectA').prepend('<div id=show-trim21-cn></dev>');
  $('#pagehistory li').each(function () {
    const el = $(this);
    try {
      const rev = parseRevEl(el);
      el.prepend(
        `<input type="checkbox" class="rev-trim21-cn" name="rev" label="select to compare" value="${rev.id}">`
      );
    } catch (e) {}
  });
  $('#columnInSubjectA span.text').append(
    '<a href="#;" id="compare-trim21-cn" tar class="l"> > 比较选中的版本</a>'
  );
  $('#compare-trim21-cn').on('click', function () {
    const selectedRevs = getSelectedVersion();
    compare(selectedRevs[0], selectedRevs[1]);
  });
  $('head').append(
    '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />'
  );
}

function getSelectedVersion(): string[] {
  const selectedVersion: string[] = [];
  const selectedRev = $('.rev-trim21-cn:checked');
  if (selectedRev.length < 2) {
    window.alert('请选中两个版本进行比较');
  }
  if (selectedRev.length > 2) {
    window.alert('只能比较两个版本');
  }
  selectedRev.each(function () {
    const val = $(this).val() as string;
    selectedVersion.push(val);
  });
  selectedVersion.reverse();
  return selectedVersion;
}

main().catch(console.error);
