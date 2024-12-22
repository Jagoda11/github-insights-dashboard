import fs from 'fs'
import path from 'path'

// Path to React app source
const SOURCE_PATH = './src'

const generateTestForFile = (filePath) => {
  const dirName = path.dirname(filePath)
  const fileName = path.basename(filePath, path.extname(filePath))
  const testFilePath = path.join(dirName, `${fileName}.test.tsx`)

  // Skip index.tsx and App.tsx files
  if (fileName === 'index.tsx' || fileName === 'App.tsx') {
    console.log(`⚠️ Skipping ${fileName} file: ${fullPath}`)
    return
  }

  if (fs.existsSync(testFilePath)) {
    console.log(`⚠️ Test file already exists: ${testFilePath}`)
    return
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  let testTemplate

  const isDefaultExport = fileContent.includes('export default')
  const importStatement = isDefaultExport
    ? `import ${fileName} from './${fileName}'`
    : `import { ${fileName} } from './${fileName}'`

  if (
    fileContent.includes('React.Component') ||
    fileContent.includes('function')
  ) {
    // Component Test Template
    console.log(`✨ Generating tests for component: ${fileName}`)
    const hasButton =
      fileContent.includes('<button') || fileContent.includes('onClick')

    testTemplate = `${importStatement}
import React from 'react';
import { render, screen${hasButton ? ', fireEvent' : ''} } from '@testing-library/react';

describe('${fileName} Component', () => {
  it('🚀 should render without crashing', () => {
    render(<${fileName} />);
    expect(screen.getByText(/your test content/i)).toBeInTheDocument();
  });

  it('🌀 should match snapshot', () => {
    const { container } = render(<${fileName} />);
    expect(container).toMatchSnapshot();
  });

  it('🧩 should apply props correctly', () => {
    const testProp = 'Test Title';
    render(<${fileName} title={testProp} />);
    expect(screen.getByText(testProp)).toBeInTheDocument();
  });

  ${
    hasButton
      ? `it('🎯 should handle button click events', () => {
    const handleClick = jest.fn();
    render(<${fileName} onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });`
      : ''
  }

  it('📘 should have accessible ARIA roles', () => {
    render(<${fileName} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
`
  } else {
    // Generic Test Template
    console.log(`📂 Generating generic test for: ${fileName}`)
    testTemplate = `${importStatement}

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
    const fileName = path.basename(file)
    if (fileName === 'index.tsx') {
      console.log(`⚠️ Skipping index.tsx file: ${fullPath}`)
      return
    }
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath)
    } else if (/\.(jsx|tsx)$/.test(file) && !/\.test\.tsx$/.test(file)) {
      generateTestForFile(fullPath)
    }
  })
}

console.log('🌟 Starting test generation...')
traverseDirectory(SOURCE_PATH)
console.log('🎉 Test generation completed!')
