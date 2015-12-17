#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"revmob-titanium",@"name",@"com.revmob.titanium",@"moduleid",@"0.1.1",@"version",@"2ebe79fd-8e3e-447e-b640-bfbda992293e",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
