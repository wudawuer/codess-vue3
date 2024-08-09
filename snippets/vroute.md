## vroute
#### Vue Router Route
Vue Router route with per route code-splitting
```
{
	path: '${1:pathName}',
	name: '${2:routeName}',
	component: () => import('./${3:pathToComponent}'),
},
```