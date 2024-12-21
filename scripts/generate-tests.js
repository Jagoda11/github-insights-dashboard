import fs from 'fs'
import path from 'path'

// Path to React app source
const SOURCE_PATH = './src'

const generateTestForFile = (filePath) => {
  const testFilePath = filePath.replace(/\.(jsx|tsx)$/, '.test.$1')

  if (fs.existsSync(testFilePath)) {
    console.log(`⚠️ Test file already exists: ${testFilePath}`)
    return
  }

  const fileName = path.basename(filePath, path.extname(filePath))
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  let testTemplate

  if (
    fileContent.includes('React.Component') ||
    fileContent.includes('function')
  ) {
    // Component Test Template
    console.log(`✨ Generating tests for component: ${fileName}`)
    testTemplate = `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${fileName} from './${fileName}';

describe('${fileName} Component', () => {
  it('🚀 should render without crashing', () => {
    render(<${fileName} />);
    expect(screen.getByText(/your test content/i)).toBeInTheDocument();
  });

  it('🌀 should match snapshot', () => {
    const { container } = render(<${fileName} />);
    expect(container).toMatchSnapshot();
  });
});
`
  } else {
    // Generic Test Template
    console.log(`📂 Generating generic test for: ${fileName}`)
    testTemplate = `import { ${fileName} } from './${fileName}';

describe('${fileName}', () => {
  it('✅ should be defined', () => {
    expect(${fileName}).toBeDefined();
  });
});
`
  }

  fs.writeFileSync(testFilePath, testTemplate)
  console.log(`✨ Test file created: ${testFilePath}`)
}

const traverseDirectory = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath)
    } else if (/\.(jsx|tsx)$/.test(file) && !/\.test\.(jsx|tsx)$/.test(file)) {
      generateTestForFile(fullPath)
    }
  })
}

console.log('🌟 Starting test generation...')
traverseDirectory(SOURCE_PATH)
console.log('🎉 Test generation completed!')
