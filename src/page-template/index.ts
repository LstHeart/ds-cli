import {
  Rule, SchematicContext, Tree,
  apply, mergeWith, url,
  move, applyTemplates, SchematicsException,
  chain, template, branchAndMerge,
} from '@angular-devkit/schematics';
import { normalize, strings, virtualFs, workspaces } from '@angular-devkit/core';
import { Schema as PageComponentSchema } from './schema'
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';

function getParsePath(tree: Tree, options: any): any {

  // 读取angular.json文件并存为buffer
  const workspaceConfigBuffer = tree.read("angular.json")

  // 判断是不是在一个angular-cli工作区
  if (!workspaceConfigBuffer) {
    throw new SchematicsException('不在angular cli工作区,请在angular项目中执行!')
  }

  // 读取并整理angular配置
  const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
  // 有传入project属性或者是默认project
  const projectName = options.project || workspaceConfig.defaultProject;
  // 获取project定义
  const project: workspaces.ProjectDefinition = workspaceConfig.projects[projectName];

  // 获取默认project路径
  const defaultProjectPath = buildDefaultPath(project);
  // const defaultProjectPath = 'src/feartures/login';
  console.log('workspaceConfig:', workspaceConfig);
  console.log('projectName:', projectName);

  // parseName()可以把路径和文件名拆开,取得path和name
  // 例如 src/feartures/login,会被拆分为 path:src/features 和 name:login
  const parsePath = parseName(defaultProjectPath, options.name);

  return parsePath;
}

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function genPage(_options: PageComponentSchema): Rule {

  return async (tree: Tree, _context: SchematicContext) => {
    // 创建虚拟目录
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('angular.json', host);
    // const workspace = await getWorkspace(tree);

    // 获取到在angular cli工作区下的 路劲和要生成的组件 前缀name
    // const { name, path } = getParsePath(tree, _options);
    const project = (_options.project != null) ? workspace.projects.get(_options.project) : null;
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${_options.project}`);
    }

    const sourceRoot = `${project.sourceRoot}`;
    // const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';
    // if (_options.path === undefined) {
    //   // _options.path = `${project.sourceRoot}/${projectType}`;
    //   _options.path = `${project.sourceRoot}`;
    // }
    // 读取模板文件
    const sourceTemplates = url('./files');

    // 应用模板文件
    const templateSource = apply(sourceTemplates, [
      applyTemplates({
        ..._options,
        ...strings,
        name: _options.name
      }),
      move(normalize(sourceRoot as string))
    ]);

    console.log('schemaArgs:', _options);
    console.log('virtual workspace:', workspace.projects);
    // 将传入的值(option)与模板文件合并(传入值替代模板变量值)
    // return mergeWith(templateSource)(tree, _context);
    return chain([
      mergeWith(templateSource)
    ]);
  };
}
