import {NgZone} from '@angular/core';
import {TimeSincePipe} from './time-since.pipe';

class NgZoneMock {
	runOutsideAngular (fn: Function) {
		return fn();
	}
	run(fn: Function) {
		return fn();
	}
};

describe('time-since-pipe', () => {
	const now = Date.now();
	var clock:any;
	const oneSec = 1000;
	const oneMin = oneSec * 60;
	const oneHour = oneMin * 60;
	const oneDay = oneHour * 24;
	const oneMonth = oneDay * 30.416;
	beforeEach(() => {
		jasmine.clock().install();
		jasmine.clock().mockDate(new Date(now));
	});
	afterEach(() => {
		jasmine.clock().uninstall();
	});
	describe('output tests', function () {
		let pipe = new TimeSincePipe(null, new NgZoneMock() as NgZone);
		it('\'a few seconds ago\' tests', () => {
			var pastDate = new Date();
			for (let i =0; i < 45; i++){
				jasmine.clock().tick(oneSec);
				if (i < 44) {
					expect(pipe.transform(pastDate.toString())).toEqual('a few seconds ago');
				}
			}
		});
		it('\'a minute ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneSec * 45);
			for (let i =45; i < 89; i++){
				jasmine.clock().tick(oneSec);
				if (i < 89){
					expect(pipe.transform(pastDate.toString())).toEqual('a minute ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual('a minute ago');
				}
			}
		});
		it('\'x minutes ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneSec * 50);
			for (let i =1; i < 44; i++){
				jasmine.clock().tick(oneMin);
				if (i < 44){
					expect(pipe.transform(pastDate.toString())).toEqual(i+1 + ' minutes ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual(i+1 + ' minutes ago');
				}
			}
		});
		it('\'an hour ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneMin * 45);
			for (let i =45; i < 120; i++){
				jasmine.clock().tick(oneMin);
				if (i < 90){
					expect(pipe.transform(pastDate.toString())).toEqual('an hour ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual('an hour ago');
				}
			}
		});
		it('\'x hours ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneMin * 50);
			for (let i = 1; i < 25; i++){
				jasmine.clock().tick(oneHour);
				if (i < 22){
					expect(pipe.transform(pastDate.toString())).toEqual(i+1 + ' hours ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual(i+1 + ' hours ago');
				}
			}
		});
		it('\'a day ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneHour * 22);
			for (let i = 22; i < 40; i++){
				jasmine.clock().tick(oneHour);
				if (i < 36){
					expect(pipe.transform(pastDate.toString())).toEqual('a day ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual('a day ago');
				}
			}
		});
		it('\'x days ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneHour * 35);
			for (let i = 1; i < 30; i++){
				jasmine.clock().tick(oneDay);
				if (i < 25){
					expect(pipe.transform(pastDate.toString())).toEqual(i+1 + ' days ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual(i+1 + ' days ago');
				}
			}
		});
		it('\'a month ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneDay * 25);
			for (let i = 25; i < 50; i++){
				jasmine.clock().tick(oneDay);
				if (i < 45){
					expect(pipe.transform(pastDate.toString())).toEqual('a month ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual('a month ago');
				}
			}
		});
		it('\'x month ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneDay * 43);
			for (let i = 1; i < 13; i++){
				jasmine.clock().tick(oneMonth);
				if (i < 10){
					expect(pipe.transform(pastDate.toString())).toEqual(i +1 + ' months ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual(i +1 + ' months ago');
				}
			}
		});
		it('\'a year ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneDay * 345);
			for (let i = 345; i < 545; i++){
				jasmine.clock().tick(oneDay);
				if (i < 545){
					expect(pipe.transform(pastDate.toString())).toEqual('a year ago');
				} else {
					expect(pipe.transform(pastDate.toString())).not.toEqual('a year ago');
				}
			}
		});
		it('\'a year ago\' tests', () => {
			var pastDate = new Date();
			jasmine.clock().tick(oneMonth * 22);
			expect(pipe.transform(pastDate.toString())).toEqual(2 + ' years ago');
			jasmine.clock().tick(oneMonth * 12);
			expect(pipe.transform(pastDate.toString())).toEqual(3 + ' years ago');
			jasmine.clock().tick(oneMonth * 36);
			expect(pipe.transform(pastDate.toString())).toEqual(6 + ' years ago');
		});
	});
});