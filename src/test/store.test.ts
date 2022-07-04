/**
 * @vitest-environment happy-dom
 */

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia, TestingOptions } from '@pinia/testing';

import { RpcTopBar, RpcBar } from '@components';
import { useLogsStore, useRpcStore } from '@stores';
import { setActivePinia, createPinia } from 'pinia';

const API = 'https://api.devnet.solana.com/';
describe('Logs Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('inits', () => {
    const logsStore = useLogsStore();
    expect(logsStore.logs).toEqual([]);
  });

  test('add some log', () => {
    const logsStore = useLogsStore();
    logsStore.setLogs('hello');
    expect(logsStore.logs).toEqual(['hello']);
  });

  test('clear logs', () => {
    const logsStore = useLogsStore();
    logsStore.setLogs('hello');
    logsStore.clearLogs();
    expect(logsStore.logs).toEqual([]);
  });
});

function factory(component: any, options?: TestingOptions) {
  const wrapper = mount(component, {
    global: {
      plugins: [createTestingPinia({ ...options, createSpy: vi.fn })],
    },
  });

  const rpcStore = useRpcStore();

  return { wrapper, rpcStore };
}

describe('RpcBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('can mount RpcBar', () => {
    const { wrapper } = factory(RpcBar);

    expect(wrapper.exists()).toBe(true);
  });
  test('Not connected text', () => {
    const { wrapper } = factory(RpcBar);

    expect(wrapper.find('span').text()).toBe('RPC url');
  });
  
});

describe("RpcTopBar", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("can mount rpcTopBar", () => {
    const { wrapper } = factory(RpcTopBar);

    expect(wrapper.exists()).toBe(true);
  });
  test("Not connected text", () => {
    const { wrapper } = factory(RpcTopBar);

    expect(wrapper.find("span").text()).toBe("⛔ Not connected");
  });
  test("Connected text", () => {
    const { wrapper, rpcStore } = factory(RpcTopBar,{ stubActions: false });
    rpcStore.setUrl(API);
    console.log("url2", rpcStore.url);
    expect(rpcStore.url).toBe(API);
    expect(wrapper.find("span").text()).toBe(`RPC url: ${API}`);
  });
});
