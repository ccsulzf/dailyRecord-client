import { Component, OnInit } from '@angular/core';
import { ChartCompareService } from '../services';
import * as d3 from 'd3';
@Component({
  selector: 'app-chart-compare',
  templateUrl: './chart-compare.component.html',
  styleUrls: ['./chart-compare.component.scss']
})
export class ChartCompareComponent implements OnInit {
  width = 760;
  height = 560;

  constructor(
    private chartCompareService: ChartCompareService
  ) { }

  ngOnInit() {
  }

  async onStart() {
    await this.chartCompareService.getData();
    const svg = d3.select('#compare');

    const y = d3.scaleBand()
      .domain(d3.range(this.chartCompareService.expenseBookList.length))
      .rangeRound([0, this.height - 40])
      .padding(0.1);

    const x = d3.scaleLinear()
      .domain([(this.chartCompareService.minPrev.amount / 100), (this.chartCompareService.maxNext.amount / 100)])
      .rangeRound([50, this.width])

    console.log(x(0) + '--' + x(1500) + '--' + x(-15));
    console.log(x(this.chartCompareService.maxNext.amount / 100));
    console.log(x(this.chartCompareService.minPrev.amount / 100));

    svg.append('g')
      .attr('fill', 'red')
      .selectAll('rect')
      .data(this.chartCompareService.nextComposeExpenseData)
      .join('rect')
      .attr('x', (d) => x(0))
      .attr('y', (d, i) => y(i) + y.bandwidth() + 10)
      .attr('width', d => x(d.amount / 100) - x(0))
      .attr('height', y.bandwidth());

    console.log(this.chartCompareService.prevComposeExpenseData);
    svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(this.chartCompareService.prevComposeExpenseData)
      .join('rect')
      .attr('x', d => { console.log(d.amount / 100); console.log(x(d.amount / 100)); return x(d.amount / 100);})
      .attr('y', (d, i) => { return y(i) + y.bandwidth() + 10; })
      .attr('width', d => {
        console.log(x(0) + '--' + x(d.amount / 100));
        const n = x(0) - x(d.amount / 100);
        return n ;
      })
      .attr('height', y.bandwidth());


    // svg.append('g')
    //   .selectAll('g')
    //   .data(series)
    //   .join('g')
    //   // .attr('fill', d => color(d.key))
    //   .selectAll('rect')
    //   .data(d => { console.log(d.map(v => Object.assign(v, { key: d.key }))); return d.map(v => Object.assign(v, { key: d.key })); })
    //   .join('rect')
    //   .attr('x', d => { console.log(x(d[0])); return x(d[0]) })
    //   .attr('y', ({ data: [name] }) => y(name))
    //   .attr('width', d => x(d[1]) - x(d[0]))
    //   .attr('height', 28)

    svg.append('g')
      .call(g => this.yAxis(g, y));

    svg.append('g')
      .call(g => this.xAxis(g, x));
  }

  yAxis(g, y) {
    return g.attr('transform', `translate(50,40)`)
      .call(d3.axisLeft(y).tickFormat(i => this.chartCompareService.expenseBookList[i].expenseBookName).tickSizeOuter(1));
  }

  xAxis(g, x) {
    return g
      .attr('transform', `translate(0,40)`)
      .call(d3.axisTop(x)
        .ticks(this.width / 80)
        .tickFormat(this.formatValue(x))
        .tickSizeOuter(0))
      .call(g => g.select('.domain').remove())
      .call(g => g.append('text')
        .attr('x', x(0) + 20)
        .attr('y', -24)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text('202006'))
      .call(g => g.append('text')
        .attr('x', x(0) - 20)
        .attr('y', -24)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'end')
        .text('202005'));
  }

  formatValue(data) {
    const format = d3.format('');
    return x => format(Math.abs(x));
  }
}
