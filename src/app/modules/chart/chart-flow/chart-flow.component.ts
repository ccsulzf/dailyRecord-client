import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
@Component({
  selector: 'app-chart-flow',
  templateUrl: './chart-flow.component.html',
  styleUrls: ['./chart-flow.component.scss']
})

export class ChartFlowComponent implements OnInit {
  width = 760;
  height = 560;

  count = 0;
  constructor() { }

  ngOnInit() {
    console.log(location.href);
  }

  start() {
    const svg = d3.select('#sankey');

    const formatNumber = d3.format(',.0f');
    const format = (d: any) => { return formatNumber(d) + ' series'; };
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const sankey = d3Sankey.sankey()
      .nodeId((d: any) => d.name)
      // .nodeAlign(d3[`sankey${align[0].toUpperCase()}${align.slice(1)}`])
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 5], [this.width - 1, this.height - 5]]);

    d3.json('../../../../assets/chart-data/flow.json').then((data: any) => {
      const { nodes, links } = sankey({
        nodes: data.nodes.map(d => Object.assign({}, d)),
        links: data.links.map(d => Object.assign({}, d))
      });

      svg.append('g')
        .attr('stroke', '#000')
        .selectAll('rect')
        .data(nodes)
        .join('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('height', d => d.y1 - d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('fill', color)
        .append('title')
        .text(d => `${d.name}\n${format(d.value)}`);

      const link = svg.append('g')
        .attr('fill', 'none')
        .attr('stroke-opacity', 0.5)
        .selectAll('g')
        .data(links)
        .join('g')
        .style('mix-blend-mode', 'multiply');


      const gradient = link.append('linearGradient')
        .attr('id', (d) => (d.uid = this.uid('link')).id)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', d => d.source.x1)
        .attr('x2', d => d.target.x0);

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d => this.color(d.source));

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d => { return this.color(d.target) });


      link.append('path')
        .attr('d', d3Sankey.sankeyLinkHorizontal())
        .attr('stroke', d => d.uid)
        .attr('stroke-width', d => Math.max(1, d.width));

      link.append('title')
        .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

      svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('x', d => d.x0 < this.width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr('y', d => (d.y1 + d.y0) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', d => d.x0 < this.width / 2 ? 'start' : 'end')
        .text(d => d.name);
    });
  }

  // 这个是D3自己维护了一个库里面的
  // 库地址 https://github.com/observablehq/stdlib
  uid(name) {
    function Id(id) {
      this.id = id;
      this.href = new URL(`#${id}`, location.href) + '';
    }
    Id.prototype.toString = function () {
      return 'url(' + this.href + ')';
    };

    return new Id('O-' + (name == null ? '' : name + '-') + ++this.count);
  }

  color(item) {
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    console.log(item);
    console.log(Math.random() * 10);


    // console.log(color(item.category === undefined ? item.name : item.category));
    // return color(Math.random() * 10);
    return d3.schemeCategory10[Math.floor(Math.random() * 10)];
  }

  sankey() {
    const sankey = d3Sankey.sankey()
      .nodeId((d: any) => d.name)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 5], [this.width - 1, this.height - 5]]);
    return ({ nodes, links }) => sankey({
      nodes: nodes.map(d => Object.assign({}, d)),
      links: links.map(d => Object.assign({}, d))
    });
  }

}
