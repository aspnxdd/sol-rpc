/**
 * @vitest-environment happy-dom
 */

import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia, TestingOptions } from "@pinia/testing";

import { RpcTopBar, RpcBar } from "@components";
import { useLogsStore, useRpcStore } from "@stores";
import { setActivePinia, createPinia } from "pinia";

const API = "https://api.devnet.solana.com/";
describe("Logs Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("inits", () => {
    const logsStore = useLogsStore();
    expect(logsStore.logs).toEqual([]);
  });

  test("add some log", () => {
    const logsStore = useLogsStore();
    logsStore.setLogs("hello");
    expect(logsStore.logs).toEqual(["hello"]);
  });

  test("clear logs", () => {
    const logsStore = useLogsStore();
    logsStore.setLogs("hello");
    logsStore.clearLogs();
    expect(logsStore.logs).toEqual([]);
  });
});

function factory(options?: TestingOptions) {
  const wrapper = mount(RpcBar, {
    global: {
      plugins: [createTestingPinia({ ...options, createSpy: vi.fn })],
    },
  });

  const rpcStore = useRpcStore();

  return { wrapper, rpcStore };
}

describe("RpcBar", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("can mount RpcBar", () => {
    const { wrapper } = factory();

    expect(wrapper.exists()).toBe(true);
  });
  test("Not connected text", () => {
    const { wrapper } = factory();

    expect(wrapper.find("span").text()).toBe("RPC url:");
  });
  test("Connected text", async () => {
    const { wrapper, rpcStore } = factory({ stubActions: false });
    wrapper.findAll("input")[0].setValue(API);
    expect(wrapper.findAll("input")[0].element.value).toBe(API);
    const button = wrapper.find("button");
    await button.trigger("click");
    
    expect(rpcStore.url).toBe(API);

    // expect(wrapper.find("span").text()).toBe(`RPC url: ${API}`);
  });
});

// describe("RpcTopBar", () => {
//   beforeEach(() => {
//     setActivePinia(createPinia());
//   });

//   test("can mount rpcTopBar", () => {
//     const { wrapper } = factory();

//     expect(wrapper.exists()).toBe(true);
//   });
//   test("Not connected text", () => {
//     const { wrapper } = factory();

//     expect(wrapper.find("span").text()).toBe("Not connected");
//   });
//   test("Connected text", () => {
//     const { wrapper, rpcStore } = factory({ stubActions: false });
//     rpcStore.setUrl(API);
//     expect(rpcStore.url).toBe(API);
//     expect(wrapper.find("span").text()).toBe(`RPC url: ${API}`);
//   });
// });
