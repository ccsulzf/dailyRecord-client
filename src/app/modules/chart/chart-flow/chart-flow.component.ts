import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartFlaowService } from '../services';
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
  constructor(
    private chartFlaowService: ChartFlaowService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // start() {
  //   const svg = d3.select('#sankey');
  //   const formatNumber = d3.format(',.0f');
  //   const format = (d: any) => { return formatNumber(d) + ' series'; };
  //   const color = d3.scaleOrdinal(d3.schemeCategory10);
  //   const sankey = d3Sankey.sankey()
  //     .nodeWidth(4)
  //     .nodePadding(20)
  //     .extent([[0, 5], [this.width, this.height - 5]])
  //   this.chartFlaowService.getData().then((data: any) => {
  //     this.chartFlaowService.getKey(data);
  //     this.chartFlaowService.testIncome(data.income);
  //     this.chartFlaowService.testExpense(data.expense);

  //     const { nodes, links } = sankey({
  //       nodes: this.chartFlaowService.nodes.map(d => Object.assign({}, d)),
  //       links: this.chartFlaowService.links.map(d => Object.assign({}, d))
  //     });

  //     svg.append('g')
  //       .selectAll('rect')
  //       .data(nodes)
  //       .join('rect')
  //       .attr('x', d => d.x0)
  //       .attr('y', d => d.y0)
  //       .attr('height', d => d.y1 - d.y0)
  //       .attr('width', d => d.x1 - d.x0)
  //       .append('title')
  //       .text(d => `${d.name}\n${d.value.toLocaleString()}`);

  //     svg.append('g')
  //       .attr('fill', 'none')
  //       .selectAll('g')
  //       .data(links)
  //       .join('path')
  //       .attr('d', d3Sankey.sankeyLinkHorizontal())
  //       .attr('stroke', d => color(d.names[0]))
  //       .attr('stroke-width', d => d.width)
  //       .style('mix-blend-mode', 'multiply')
  //       .append('title')
  //       .text(d => `${d.names.join(' → ')}\n${d.value.toLocaleString()}`);

  //     svg.append('g')
  //       .style('font', '10px sans-serif')
  //       .selectAll('text')
  //       .data(nodes)
  //       .join('text')
  //       .attr('x', d => d.x0 < this.width / 2 ? d.x1 + 6 : d.x0 - 6)
  //       .attr('y', d => (d.y1 + d.y0) / 2)
  //       .attr('dy', '0.35em')
  //       .attr('text-anchor', d => d.x0 < this.width / 2 ? 'start' : 'end')
  //       .text(d => d.name)
  //       .append('tspan')
  //       .attr('fill-opacity', 0.7)
  //       .text(d => ` ${d.value.toLocaleString()}`);
  //   })


  // }

  onStart() {
    const svg = d3.select('#sankey');

    const formatNumber = d3.format(',.0f');
    const format = (d: any) => { return (d / 100) + ' 元'; };
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const sankey = d3Sankey.sankey()
      .nodeId((d: any) => d.name)
      .nodeAlign(d3Sankey['sankeyRight'])
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 5], [this.width - 1, this.height - 5]]);

    this.chartFlaowService.getData().then((data: any) => {
      this.chartFlaowService.handleIncome(data.income);
      this.chartFlaowService.handleExpense(data.expense);
      const { nodes, links } = sankey({
        nodes: this.chartFlaowService.nodes.map(d => Object.assign({}, d)),
        links: this.chartFlaowService.links.map(d => Object.assign({}, d))
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
        // .attr('stroke', d => this.color(d.source))
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
    // if (item.category === 'income') {
    //   return '#f44336'
    // } else {
    //   if (item.category === 'expenseBook') {
    //     return '#3700B3';
    //   } else {
    //     return '#cccc';
    //   }
    const color = d3.scaleOrdinal(d3.schemeCategory10);

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
