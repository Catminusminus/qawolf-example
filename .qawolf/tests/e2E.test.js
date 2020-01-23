const { launch } = require("qawolf");
const selectors = require("../selectors/e2E");

describe('e2E', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: "http://localhost:3000/" });
  });

  afterAll(() => browser.close());

  it('can type into body', async () => {
    await browser.type(selectors[0], "he");
  });

  it('can click "todo" input', async () => {
    await browser.click(selectors[1]);
  });

  it('can type into "todo" input', async () => {
    await browser.type(selectors[2], "hello");
  });

  it('can click "Add Todo" button', async () => {
    await browser.click(selectors[3]);
  });

  it('can click "todo" input', async () => {
    await browser.click(selectors[4]);
  });

  it('can type into "todo" input', async () => {
    await browser.type(selectors[5], "hi");
  });

  it('can click "Add Todo" button', async () => {
    await browser.click(selectors[6]);
  });

  it('can click "Active" button', async () => {
    await browser.click(selectors[7]);
  });

  it('can click "Completed" button', async () => {
    await browser.click(selectors[8]);
  });

  it('can click "All" button', async () => {
    await browser.click(selectors[9]);
  });

  it('can click "hello" li', async () => {
    await browser.click(selectors[10]);
  });

  it('can click "Add Todo hello hi Show: AllActiveComplet..." div', async () => {
    await browser.click(selectors[11]);
  });

  it('can click "Active" button', async () => {
    await browser.click(selectors[12]);
  });

  it('can click "Completed" button', async () => {
    await browser.click(selectors[13]);
  });

  it('can click "All" button', async () => {
    await browser.click(selectors[14]);
  });
});